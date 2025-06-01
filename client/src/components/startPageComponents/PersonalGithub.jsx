const PersonalGithub = ({ name, link }) => {
    return (
        <a
            className="text-xs sm:text-base"
            href={link}
        >
            {name}
        </a>
    );
}

export default PersonalGithub;