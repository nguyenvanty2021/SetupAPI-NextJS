import useSWR from "swr";
import { PublicConfiguration } from "swr/dist/types";
import { authApi } from "../api-client";
const MILLISECOND_PER_HOUR = 60 * 60 * 1000; // 1 giờ
const useAuth = (options?: Partial<PublicConfiguration>) => {
  // giải thích chi tiết ở file: swr.tsx trong folder pages
  // url: /students/${studentId} sẽ được truyền vào SWRConfig nằm trong file _app.tsx (trong folder pages) để call 1 api get
  const {
    data: profile,
    error,
    mutate,
    isValidating,
  } = useSWR("/profile", {
    // cho thuộc tính: revalidateOnFocus này = false thì khi click qua tab khác và quay lại tab này (hay nói cách khác là tab có UI này) thì nó sẽ không gọi lại api nữa
    revalidateOnFocus: false,
    // thuộc tính: dedupingInterval có tác dụng giữ lại data cũ trong vòng bao nhiêu giây mà không phải fetch (call) lại data mới
    // như VD thì mình đang để 1 giờ, thì trong vòng 1 giờ khi mình click qua những trang khác rồi back lại trang này data vẫn giữ nguyên không thay đổi
    // không phải fetch hay call lại api
    // có hay không dùng thuộc tính: revalidateOnFocus này cũng được
    dedupingInterval: MILLISECOND_PER_HOUR,
    ...options,
  });
  const login = async () => {
    try {
      const res = await authApi.login({ username: "", password: "" });
      // khi để = true thì thuộc tính mutate này sẽ thay đổi tất cả những thuộc tính name trong api (trong từng obj)
      // thành tên: "loading..." hết và sau đó nó tiến hành fetch hay call lại api để cập nhật lại data mới và tức thì nó sẽ
      // gán lại name mới theo api không còn là loading... nữa -> trong time call api or fetch data thì nó sẽ show ra dữ liệu cũ, mà dữ liệu cũ mình đã thay đổi thành "loading..." vì mình đang show ra name
      // -> thường dùng cho chức năng VD: như update khi update xong click cái hàm này mình show loading ra xong sau đó nó tự
      // call 1 api mới ngầm và tự động cập nhật data mới lên UI
      // Còn nếu = false thì tất cả thuộc tính name đổi thành "loading..." mãi và không call lại api, các giá trị trong
      // thuộc tính name vẫn là loading...
      // sau khi login thành công thì call api or fetch data profile
      await mutate();
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const logout = async () => {
      // call api logout
      // xong sau đó
      // để dữ liệu tạm là {} rỗng và không cần call api or fetch data nào cả nên để false
      mutate({}, false);
  };
  return {
    profile,
    error,
    login,
    logout,
  };
};
export default useAuth;
