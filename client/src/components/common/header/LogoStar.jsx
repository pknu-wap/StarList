import { Title, MainpageLogo } from '../../../assets';

const LogoStar = () => {
    return (
        <div
            className="
        flex items-end
        h-[67px]    /* 전체 컨테이너 높이 고정 */
      "
        >
            {/* 1) 로고 아이콘 */}
            <img
                src={MainpageLogo}
                alt="Starlist Logo"
                className="w-[67px] h-[67px] object-cover"
            />

            {/* 2) 타이틀: Figma상의 32.97px 띄움, 24px 높이 */}
            <img
                src={Title}
                alt="Starlist Title"
                className="
          ml-[32.97px]   /* Figma에 재어보신 간격 */
          w-[100px] h-[24px]
          object-contain
        "
            />
        </div>
    );
};

export default LogoStar;
