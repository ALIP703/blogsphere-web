const RecentPosts = () => {
  return (
    <div>
      <div
        className="block max-w-sm  p-3 lg:p-6  mx-auto mt-4  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Recent Posts
        </h5>
        <div className="my-5">
        <ul>
          <li>
            <p className="font-normal text-gray-700">Web Development </p>
          </li>
          <li>
            <p className="font-normal text-gray-700">Design</p>
          </li>
          <li>
            <p className="font-normal text-gray-700">Programming</p>
          </li>
          <li>
            <p className="font-normal text-gray-700">Technology</p>
          </li>
        </ul>
        </div>
    </div>
    </div>
  )
}

export default RecentPosts
