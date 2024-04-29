import CheapProducts from './_page-components/cheap';
import RatedProducts from './_page-components/rated';

export default function Home() {
  return (
    <div className='flex flex-col gap-6 p-3'>
      <RatedProducts />
      <CheapProducts />
    </div>
  );
}
