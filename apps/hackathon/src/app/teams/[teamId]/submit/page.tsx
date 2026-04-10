import { FC, ReactElement, useState, useEffect } from 'react';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { Button, Textarea } from '@imphnen-frontend-service/ui/atoms';
import { useNavigate, useParams } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import {
  projectSubmissionSchema,
  TProjectSubmissionForm,
  useSubmitProject,
  useTeamById,
  useTeamSubmission,
  useUploadSubmission,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';

const MIN_TEAM_MEMBERS = 2;
const MAX_FILE_SIZE = 2 * 1024 * 1024;

const SUBMISSION_DEADLINE = new Date('2025-12-07T16:59:00Z');

const SubmitProjectPage: FC = (): ReactElement => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const isDeadlinePassed = new Date() >= SUBMISSION_DEADLINE;

  useEffect(() => {
    if (isDeadlinePassed) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = SUBMISSION_DEADLINE.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [isDeadlinePassed]);

  const { data: teamData } = useTeamById(teamId || '');
  const { data: submissionData } = useTeamSubmission(teamId || '', !!teamId);
  const { mutateAsync: submitProject, isPending: isSubmitting } =
    useSubmitProject(teamId || '');
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadSubmission();

  const team = teamData?.data;
  const currentUserId = session?.user?.id;
  const isLeader = currentUserId === team?.leader_id;
  const hasSubmission = !!submissionData?.data;
  const memberCount = team?.members?.length || 0;
  const hasEnoughMembers = memberCount >= MIN_TEAM_MEMBERS;

  const form = useForm<TProjectSubmissionForm>({
    resolver: zodResolver(projectSubmissionSchema),
    mode: 'all',
  });

  if (!isLeader) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Only the team leader can submit projects
        </p>
        <Button onClick={() => navigate(`/teams/${teamId}`)}>
          Back to Team
        </Button>
      </div>
    );
  }

  if (hasSubmission) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Project Already Submitted
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Your team has already submitted a project
        </p>
        <div className="flex space-x-3">
          <Button onClick={() => navigate(`/teams/${teamId}/submission`)}>
            View Submission
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(`/teams/${teamId}`)}
          >
            Back to Team
          </Button>
        </div>
      </div>
    );
  }

  if (isDeadlinePassed) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <div className="bg-white dark:bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <Icon
                icon="mdi:clock-alert"
                className="text-3xl text-red-600 dark:text-red-400"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Submission Closed
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Project submissions are no longer accepted.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The submission deadline was December 7, 2025 at 23:59 WIB.
            </p>

            <button
              onClick={() => navigate(`/teams/${teamId}`)}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
            >
              Back to Team
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleScreenshotUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const oversizedFiles = Array.from(files).filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error(`${oversizedFiles.length} file(s) are too large. Maximum size is 2MB per file.`);
      e.target.value = '';
      return;
    }

    try {
      const uploadPromises = Array.from(files).map((file) => uploadFile(file));
      const results = await Promise.all(uploadPromises);
      const urls = results.map((r) => r.data.url);
      setScreenshots([...screenshots, ...urls]);
    } catch (error) {
      console.error('Failed to upload screenshots:', error);
      toast.error('Failed to upload screenshots. Please try again.');
    }
  };

  const removeScreenshot = (index: number) => {
    setScreenshots(screenshots.filter((_, i) => i !== index));
  };

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await submitProject({
        ...data,
        screenshots,
      });
      navigate(`/teams/${teamId}/submission`);
    } catch (error) {
      console.error('Failed to submit project:', error);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Submit Project
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{team?.name}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {timeLeft && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <span className="text-3xl">⏰</span>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 dark:text-blue-100 text-lg">
                  Submission Deadline
                </h3>
                <p className="text-blue-800 dark:text-blue-200 mt-2 text-sm font-sans">
                  Submissions close on December 7, 2025 at 23:59 WIB
                </p>
                <div className="mt-4 grid grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {timeLeft.days}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Days
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Hours
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Minutes
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Seconds
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!hasEnoughMembers && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <span className="text-3xl">👥</span>
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-100 text-lg">
                  Team Members Required
                </h3>
                <p className="text-amber-800 dark:text-amber-200 mt-2 text-sm font-sans">
                  Your team needs at least <strong>{MIN_TEAM_MEMBERS} members</strong> to submit a project.
                  Currently you have <strong>{memberCount} member{memberCount !== 1 ? 's' : ''}</strong>.
                  Please invite more members to your team before submitting.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <h3 className="font-bold text-red-900 dark:text-red-100 text-lg">
                IMPORTANT WARNING
              </h3>
              <ul className="text-red-800 dark:text-red-200 mt-2 space-y-1 text-sm font-sans">
                <li>• You can only submit your project ONCE</li>
                <li>• After submission, you CANNOT edit or change anything</li>
                <li>
                  • Make sure all information is correct before submitting
                </li>
                <li>• Review your project details carefully</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-950/50 p-8 border dark:border-gray-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowConfirmModal(true);
            }}
            className="space-y-6"
          >
            <ControlledInputField
              control={form.control}
              label="Project Name"
              placeholder="Enter your project name"
              name="project_name"
              size="lg"
              isRequired={true}
            />

            <div className="space-y-2">
              <label className="block text-[15px] font-medium text-gray-700 dark:text-gray-300">
                Project Description <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Describe your project, its features, and what problem it solves. You can also paste your demo video link here.
              </p>
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <div>
                    <Textarea
                      {...field}
                      placeholder="Describe your project, its features, and what problem it solves... You can paste your demo video link (YouTube, Loom, etc.) here as well."
                      rows={6}
                      className="w-full"
                      size="lg"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <ControlledInputField
              control={form.control}
              label="Repository URL (GitHub, GitLab, etc.)"
              placeholder="https://github.com/username/project"
              name="repository_url"
              type="url"
              size="lg"
              isRequired={true}
            />

            <ControlledInputField
              control={form.control}
              label="Demo URL (Optional)"
              placeholder="https://your-project-demo.com"
              name="demo_url"
              type="url"
              size="lg"
            />

            <div>
              <label className="block text-label1 font-medium text-neutral-800 dark:text-gray-300">
                Project Screenshots (Optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {screenshots.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeScreenshot(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Click to upload screenshots
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-sans">
                    PNG, JPG. Max 2MB each
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleScreenshotUpload}
                  disabled={isUploading}
                />
              </label>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => navigate(`/teams/${teamId}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!form.formState.isValid || isUploading || !hasEnoughMembers}
              >
                Review & Submit
              </Button>
            </div>
            {!hasEnoughMembers && (
              <p className="text-center text-sm text-amber-600 dark:text-amber-400 mt-2">
                You need at least {MIN_TEAM_MEMBERS} team members to submit
              </p>
            )}
          </form>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl dark:shadow-gray-950/50 max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Final Confirmation
              </h2>
              <p className="text-red-600 dark:text-red-400 font-medium">
                This action is IRREVERSIBLE!
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                By submitting, you confirm that:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>✓ All information is correct and complete</li>
                <li>✓ You understand this can only be done once</li>
                <li>✓ You cannot edit after submission</li>
                <li>✓ Your team agrees with this submission</li>
              </ul>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type <span className="font-bold text-red-600 dark:text-red-400">SUBMIT</span> to confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type SUBMIT here"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                autoComplete="off"
              />
            </div>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setShowConfirmModal(false);
                  setConfirmText('');
                }}
              >
                Go Back
              </Button>
              <Button
                onClick={onSubmit}
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={isSubmitting || confirmText !== 'SUBMIT'}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitProjectPage;
