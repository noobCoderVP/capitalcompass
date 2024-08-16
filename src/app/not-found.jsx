import { Container } from "@/components/container/container";

function NotFoundPage() {
  return (
    <>
      <div className="min-h-full px-4 py-4  sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <Container className="mt-5">
            <div className="flex mt-6">
              <p className="text-4xl font-extrabold text-black600 sm:text-5xl">
                Oops!!
              </p>
              <div className="ml-6">
                <div className="pl-6 border-l border-gray500">
                  <h2 className="text-3xl font-bold tracking-tight text-gray900 dark:text-black sm:text-4xl">
                    Something went wrong!
                  </h2>
                  <p className="mt-1 text-lg text-gray500 dark:text-black">
                    Please select a topic from the tag cloud above or go back
                    home
                  </p>
                </div>
                <div className="flex mt-10 space-x-3 sm:pl-6">
                  <a
                    href="/"
                    className="inline-flex items-center px-6 py-4 text-sm text-4xl font-medium text-black bg-black600 border border-transparent rounded-md shadow-sm hover:bg-blue700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black500"
                  >
                    Go back home
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;