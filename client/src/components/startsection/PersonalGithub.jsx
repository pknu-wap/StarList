const PersonalGithub = ({ name, link }) => {
    return (
        <a
            className="mr-3 cursor-pointer text-xs hover:text-gray-400 sm:text-base"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
        >
            {name}
        </a>
    );
};

export default PersonalGithub;
