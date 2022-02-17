import React from 'react'
import useSWR from 'swr'
// import useSWR, {mutate, trigger} from 'swr'
export interface StudentDetailProps {
  studentId: string
}
const MILLISECOND_PER_HOUR = 60 * 60 * 1000 // 1 giờ
//const fetcher = (...args) => fetch(...args).then((res) => res.json());
const StudentDetail: React.FC<StudentDetailProps> = ({ studentId }) => {
  // vào video này xem nếu chưa hiểu: https://www.youtube.com/watch?v=F1o_0umlXbU
  // giải thích chi tiết ở file: swr.tsx trong folder pages
  // url: /students/${studentId} sẽ được truyền vào SWRConfig nằm trong file _app.tsx (trong folder pages) để call 1 api get
  // const { data, error } = useSWR("http://localhost:3001/api/users", fetcher, {
  //   revalidateOnFocus: false,
  // });
  // url: /students/${studentId} sẽ được truyền vào SWRConfig nằm trong file _app.tsx (trong folder pages) để call 1 api get
  // ở lần đầu tiên có thể call api = SSR or ISR những lần sau đó có thể dùng CSR thông qua thằng useSWR để update data realtime (có ảnh trong fb)
  // const { data, error } = useSWR("http://localhost:3001/api/users", fetcher, {dataFromGetServerSideProps});
  const { data, error, mutate, isValidating } = useSWR<any>(
    `/students/${studentId}`,
    {
      // cho thuộc tính: revalidateOnFocus này = false thì khi click qua tab khác và quay lại tab này (hay nói cách khác là tab có UI này) thì nó sẽ không gọi lại api nữa
      // nói dễ hiểu hơn là: khi cho bằng true mình đi đâu đó or không động đến chuột thi khi mình quay lại click vào màn hình useSWR nó sẽ tự động call lại API getAll này -> = false để tắt chức năng này đi
      revalidateOnFocus: false,
      // thuộc tính: dedupingInterval có tác dụng giữ lại data cũ trong vòng bao nhiêu giây mà không phải fetch (call) lại data mới
      // như VD thì mình đang để 1 giờ, thì trong vòng 1 giờ khi mình click qua những trang khác rồi back lại trang này data vẫn giữ nguyên không thay đổi
      // không phải fetch hay call lại api
      // có hay không dùng thuộc tính: revalidateOnFocus này cũng được
      dedupingInterval: MILLISECOND_PER_HOUR,
     // refreshInterval: 600000, // 10 minutes
    },
  )
  // cách khác
  // const {data, error} = useSWR("https://url");
  if (isValidating && !error) {
    // để component loading vào thay thẻ div
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Failed to load</div>
  }
  if (!data) {
    // để component loading vào thay thẻ div
    return <div>Loading...</div>
  }
  const handleMutate = async () => {
    console.log('a')
    // đại loại là hàm này giống như call 1 api getAll lại khi thêm 1 data mới vào (là post xong rồi getAll lại đó)
    // -> khi click vào sẽ post data mới vào xong mutate thì khi data mới được post nó sẽ tự getAll cập nhật data lại
    // hoặc bỏ ở trên trước khi gửi request post or delete thì phải thêm tham số thứ 3 là false
    // với values là obj post
    //  mutate("http://localhost:3001/api/users", [...data, values], false);
    // trường hợp delete thì xoá cái obj đó xong lưu lại array data mới
    //  mutate("http://localhost:3001/api/users", [...data], false);
    // await fetcher("http://localhost:3001/api/users", {
    //   method: "POST",
    //   body: JSON.stringify(user),
    // });
    // or delete
    // await fetcher("http://localhost:3001/api/users", {
    //   method: "DELETE",
    //   body: JSON.stringify(user),
    // });
    // hoặc thêm ở sau thì k có tham số thứ 3 là false
    // xong sau đó getAll lại
    // mutate này dùng mutate của
    //  mutate("http://localhost:3001/api/users");
    // với values là obj post
    //  mutate("http://localhost:3001/api/users", [...data, values]);
    // trường hợp delete thì xoá cái obj đó xong lưu lại array data mới
    //  mutate("http://localhost:3001/api/users", [...data]);
    // trường hợp thêm trước request thì phải có 1 trigger(url) -> url là: http://localhost:3001/api/users-> Example: https://www.youtube.com/watch?v=a7JigiLw_OY

    // khi để = true thì thuộc tính mutate này sẽ thay đổi tất cả những thuộc tính name trong api (trong từng obj)
    // thành tên: "loading..." hết và sau đó nó tiến hành fetch hay call lại api để cập nhật lại data mới và tức thì nó sẽ
    // gán lại name mới theo api không còn là loading... nữa -> trong time call api or fetch data thì nó sẽ show ra dữ liệu cũ, mà dữ liệu cũ mình đã thay đổi thành "loading..." vì mình đang show ra name
    // -> thường dùng cho chức năng VD: như update khi update xong click cái hàm này mình show loading ra xong sau đó nó tự
    // call 1 api mới ngầm và tự động cập nhật data mới lên UI
    // Còn nếu = false thì tất cả thuộc tính name đổi thành "loading..." mãi và không call lại api, các giá trị trong
    // thuộc tính name vẫn là loading...
    mutate({ name: 'loading...' }, true)
  }
  return (
    <>
      {' '}
      <div>Name: {data?.name || '--'}</div>
      <button onClick={handleMutate}>Mutate</button>
    </>
  )
}
export default StudentDetail
