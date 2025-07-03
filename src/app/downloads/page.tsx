const DownloadPage = () => {
  return (
    <section className="bg-gray-100 py-10 px-5 text-center min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-4">Download the Propriologics App</h2>
      <p className="mb-6 text-lg">Android users can download the APK directly below:</p>
      <a
        href="/apk/propriologics-latest.apk"
        download
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded"
      >
        Download APK
      </a>
    </section>
  );
};

export default DownloadPage;
