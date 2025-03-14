import './Bar.css';

type ExperienceBarProps = {
    experience: number;
    maxExperience: number;
}

const ExperienceBar: React.FC<ExperienceBarProps> = ({ experience, maxExperience }) => {
    const experiencePercent = (experience / maxExperience) * 100;

    return (
        <div className="experience-bar bar">
            <div 
                className="experience-bar-fill"
                style={{ width: `${experiencePercent}%` }}
            ></div>
        </div>
    );
};

export default ExperienceBar;
