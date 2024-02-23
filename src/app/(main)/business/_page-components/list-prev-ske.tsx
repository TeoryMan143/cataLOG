function ListPrevEsk() {
  return (
    <div
      className='
      flex p-8 border-4 border-gray-300 gap-12 shadow-md rounded-lg animate-pulse animate-duration-900
      hover:bg-amber-100
    '
    >
      <div className='size-[150px] rounded-full bg-gray-300'></div>
      <div className='space-y-4 flex-1'>
        <div
          className='
            bg-gray-300 w-full h-16 rounded-lg
          '
        ></div>
        <div
          className='
            bg-gray-300 w-full h-12 rounded-lg
          '
        ></div>
      </div>
    </div>
  );
}
export default ListPrevEsk;
