import { FC, ReactElement, useState } from 'react';
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
  useUploadFile,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';

const SubmitProjectPage: FC = (): ReactElement => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [screenshots, setScreenshots] = useState<string[]>([]);

  const { data: teamData } = useTeamById(teamId || '');
  const { data: submissionData } = useTeamSubmission(teamId || '', !!teamId);
  const { mutateAsync: submitProject, isPending: isSubmitting } =
    useSubmitProject(teamId || '');
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();

  const team = teamData?.data;
  const currentUserId = session?.user?.id;
  const isLeader = currentUserId === team?.leader_id;
  const hasSubmission = !!submissionData?.data;

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

  const handleScreenshotUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    try {
      const uploadPromises = Array.from(files).map((file) => uploadFile(file));
      const results = await Promise.all(uploadPromises);
      const urls = results.map((r) => r.data.url);
      setScreenshots([...screenshots, ...urls]);
    } catch (error) {
      console.error('Failed to upload screenshots:', error);
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
        {/* Warning Banner */}
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
            {/* Project Name */}
            <ControlledInputField
              control={form.control}
              label="Project Name"
              placeholder="Enter your project name"
              name="project_name"
              size="lg"
              isRequired={true}
            />

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-[15px] font-medium text-gray-700 dark:text-gray-300">
                Project Description <span className="text-red-500">*</span>
              </label>
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <div>
                    <Textarea
                      {...field}
                      placeholder="Describe your project, its features, and what problem it solves..."
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

            {/* Repository URL */}
            <ControlledInputField
              control={form.control}
              label="Repository URL (GitHub, GitLab, etc.)"
              placeholder="https://github.com/username/project"
              name="repository_url"
              type="url"
              size="lg"
              isRequired={true}
            />

            {/* Demo URL */}
            <ControlledInputField
              control={form.control}
              label="Demo URL (Optional)"
              placeholder="https://your-project-demo.com"
              name="demo_url"
              type="url"
              size="lg"
            />

            {/* Presentation URL */}
            <ControlledInputField
              control={form.control}
              label="Presentation URL (Optional)"
              placeholder="https://slides.com/your-presentation or Google Drive link"
              name="presentation_url"
              type="url"
              size="lg"
            />

            {/* Screenshots */}
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
                    PNG, JPG up to 5MB each
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

            {/* Submit Button */}
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
                disabled={!form.formState.isValid || isUploading}
              >
                Review & Submit
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
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
                By clicking "Submit Project", you confirm that:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>✓ All information is correct and complete</li>
                <li>✓ You understand this can only be done once</li>
                <li>✓ You cannot edit after submission</li>
                <li>✓ Your team agrees with this submission</li>
              </ul>
            </div>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => setShowConfirmModal(false)}
              >
                Go Back
              </Button>
              <Button
                onClick={onSubmit}
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={isSubmitting}
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
