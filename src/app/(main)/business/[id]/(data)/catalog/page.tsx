import AllProducts from '../../_page-components/products/all-products';

type Props = {
  params: {
    id: string;
  };
};

function CatalogPage({ params: { id } }: Props) {
  return <AllProducts businessId={id} />;
}
export default CatalogPage;
