import { useRouter } from "next/router";

const ProductDetail = () => {
    // thử trường hợp này với params là: product-detail/123/456 -> nhiều hơn 1 params là được
    const router = useRouter();
    console.log(router.pathname)
    console.log(router.query)
    return (
        <div>Product detail</div>
    )
}
export default ProductDetail;