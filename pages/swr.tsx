import StudentDetail from "../components/swr/StudentDetail"
import React from "react";
const SWR: React.FC = () => {
    return (
        <div>
            {/* nếu thông thường thì khi gọi 3 lần StudentDetail như vậy nó sẽ call 3 api liên tiếp
            nhưng vì bên trong mỗi StudentDetail này đều có useSWR thằng SWR này nó sẽ phát hiện ra được cả 3 thằng này đều có cùng 
            1 cái keys (keys ở đây là "1") nên nó chỉ gọi api đúng 1 lần và khi api respon data về thì lúc này thằng useSWR này
            sẽ show ra data cả 3 thằng cùng 1 lúc */}
            {/* giống debound api trong saga */}
            {/* -> 2 cách này giúp giải quyết dc tình trạng call 1 lúc cùng 1 api quá nhiều lần dẫn đến loop api  */}
            <StudentDetail studentId="1" />
            <StudentDetail studentId="1" />
            <StudentDetail studentId="1" />
        </div>
    )
}
export default SWR;
