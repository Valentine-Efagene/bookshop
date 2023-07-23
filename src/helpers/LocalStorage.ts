export default class LocalStorage {
  public static setAccessToken = (token: string) => {
    localStorage.setItem("access_token", token);
  };

  public static getAccessToken = () => localStorage.getItem("access_token");

  public static clear = () => {
    localStorage.clear();
  };
}
