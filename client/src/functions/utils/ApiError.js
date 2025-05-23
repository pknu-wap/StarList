// API 오류 클래스를 정의하여 상태 코드별 처리 로직을 용이하게 함
class ApiError extends Error {
  /**
   * @param {number} code  서버가 내려준 상태 코드
   * @param {string} message  추가 메시지
   * @param {Response=} response  원본 fetch Response
   */
  constructor(code, message, response = null) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.response = response;
  }
}

export default ApiError;