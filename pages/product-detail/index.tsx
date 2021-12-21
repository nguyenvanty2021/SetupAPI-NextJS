import { useRouter } from "next/router";

const ProductDetail = () => {
    const router = useRouter();
    console.log(router.pathname)
    console.log(router.query)
    return (
        <div>Product detail</div>
    )
}
export default ProductDetail;