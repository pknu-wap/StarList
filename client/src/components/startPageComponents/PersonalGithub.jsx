const PersonalGithub = ({ name, link }) => {
    return (
        <a
            className="text-xs sm:text-base hover:text-gray-400 mr-3 cursor-pointer"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
        >
            {name}
        </a>
    );
}

export default PersonalGithub;