import { Button } from '@imphnen-frontend-service/ui/atoms';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import type { MentorDetailResponseDto } from '@imphnen-frontend-service/service';

interface MentorCardProps {
  mentor: MentorDetailResponseDto;
}

export const MentorCard: FC<MentorCardProps> = ({ mentor }) => {
  const expertise = mentor.expertise ?? [];
  const firstSkill = expertise[0];
  const secondSkill = expertise[1];
  const extraCount = expertise.length - 2;
  const yearsExp = mentor.years_of_experience ?? 0;
  const expLabel = `${yearsExp}+ Years Experience`;

  return (
    <div className="p-2.5 rounded-md bg-white shadow flex gap-x-4 items-start md:p-4 md:flex-col md:rounded-lg md:gap-y-4">
      <div className="size-[60px] rounded-md overflow-hidden md:w-full md:h-auto md:aspect-square">
        <img src="/image/testimonial.webp" alt="Mentor" className="w-full object-cover" />
      </div>
      <div>
        <Button variant="text" size="sm" className="bg-primary-100 h-auto px-1.5 py-1 text-[8px] font-normal mb-2 hover:bg-primary-100 md:text-[10px] md:font-medium md:mb-4">
          {expLabel}
        </Button>
        <h2 className="mb-1">
          <Link to={`/mentoring/${mentor.id}`} className="text-xs font-semibold text-primary-500 md:text-[15px] md:font-semibold lg:text-[19px]">
            {mentor.fullname || 'Unknown Mentor'}
          </Link>
        </h2>
        <p className="text-[8px] text-neutral-500 mb-3 md:text-[10px] md:font-medium md:mb-4 lg:text-xs">
          {mentor.current_role} at {mentor.current_company}
        </p>

        <div>
          <p className="text-[8px] text-neutral-500 mb-1 md:mb-2 lg:text-[10px]">Expertise :</p>
          <div className="space-x-2">
            {firstSkill && (
              <Button variant="text" size="sm" className="bg-primary-200 h-auto px-1.5 py-1 text-[8px] font-normal hover:bg-primary-200 lg:text-[10px]">
                {firstSkill}
              </Button>
            )}
            {secondSkill && (
              <Button variant="text" size="sm" className="bg-primary-200 h-auto px-1.5 py-1 text-[8px] font-normal hidden hover:bg-primary-200 md:inline-block lg:text-[10px]">
                {secondSkill}
              </Button>
            )}
            {extraCount > 0 && (
              <Button variant="text" size="sm" className="h-auto px-1.5 py-1 text-[8px] font-normal text-neutral-500 hover:bg-transparent lg:text-[10px]">
                +{extraCount}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
