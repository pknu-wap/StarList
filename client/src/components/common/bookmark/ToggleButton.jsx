import { CheckBoxChecked, CheckBoxEmpty } from "../../../assets";

/**
 * 다중 선택 토글 컴포넌트
 * @param {boolean} selected 현재 선택 상태
 * @param {() => void} onClick 클릭 시 호출되는 토글 함수
 */

const ToggleButton = ({ selected, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`
                group                      /* 자식에서 그룹 상태 접근 */
                inline-flex items-center justify-center
                p-1 rounded-full
                ${selected
                    ? "bg-main-500"         /* 선택됐을 땐 보라 배경 */
                    : "bg-white"            /* 안 됐을 땐 흰 배경 */
                }
                hover:${selected ? "" : "bg-main-500"}  /* 비선택 상태일 때만 hover 배경 */
              active:bg-main-500        /* 클릭 중엔 무조건 보라 배경 */
                focus:outline-none focus:ring-2 focus:ring-main-300
                transition-colors
                sm:p-2 md:p-3             /* 반응형 패딩 */
            `}
        >
            {selected
                ? <CheckBoxChecked className=" text-white" />
                : <CheckBoxEmpty className=" text-gray-300 hover:text-main-500" />
            }
        </button>
    );
}

export default ToggleButton;

