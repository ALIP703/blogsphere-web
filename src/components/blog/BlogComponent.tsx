const BlogComponent = () => {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <div className="grid gap-8">
        <div className="grid gap-4">
          <img
            src="https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg"
            alt="Blog Post"
            className="w-full h-auto aspect-video object-cover rounded-lg border border-gray-300"
          />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div>John Doe</div>
            <div>•</div>
            <div>May 1, 2023</div>
            <div className="flex items-center gap-2 ml-auto">
              {/* like button svg */}
              <svg
                className="w-4 h-4 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
              </svg>
              {/* comment button svg */}
              <svg
                className="w-4 h-4 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" />
              </svg>
              {/* save button svg */}
              <svg
                className="w-4 h-4 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              type="button"
              data-drawer-target="drawer-bottom-example"
              data-drawer-show="drawer-bottom-example"
              data-drawer-placement="bottom"
              aria-controls="drawer-bottom-example"
            >
              Show bottom drawer
            </button>
          </div>

          <div
            id="comment-box"
            className="fixed bottom-0 md:right-3 right-0 z-40 p-4 overflow-y-auto transition-transform bg-white transform-none rounded-lg shadow-lg"
            style={{ width: "400px", height: "500px" }}
            // Adjust width and height here
            // tabindex="-1"
            aria-labelledby="comment-box-label"
          >
            <h5
              id="comment-box-label"
              className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
            >
              Responses(39)
            </h5>
            <div className="flex items-center fixed bottom-0 md:right-4 gap-2" style={{ width: "390px" }}>
              <input
                type="text"
                id="comment-text"
                className="flex-1 border rounded-lg p-2"
                placeholder="Write your comment here..."
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => {
                  // Handle comment submission logic here
                  alert("Comment submitted!");
                }}
              >
                Submit
              </button>
            </div>
            <button
              type="button"
              data-drawer-hide="comment-box"
              aria-controls="comment-box"
              className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <h1 className="text-3xl font-bold">The Future of Web Development</h1>
          <div className="prose text-gray-700">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nisl nec ultricies lacus, nisl nec ultricies lacus, nisl
              nec ultricies lacus. Sed euismod, nisl nec ultricies lacus, nisl
              nec ultricies lacus, nisl nec ultricies lacus.
            </p>
            <p>
              Sed euismod, nisl nec ultricies lacus, nisl nec ultricies lacus,
              nisl nec ultricies lacus. Sed euismod, nisl nec ultricies lacus,
              nisl nec ultricies lacus, nisl nec ultricies lacus.
            </p>
            <p>
              Sed euismod, nisl nec ultricies lacus, nisl nec ultricies lacus,
              nisl nec ultricies lacus. Sed euismod, nisl nec ultricies lacus,
              nisl nec ultricies lacus, nisl nec ultricies lacus.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogComponent;
