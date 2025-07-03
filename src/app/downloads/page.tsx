// src/app/downloads/page.tsx

const DownloadPage = () => {
  return (
    <section className="text-center py-10 px-5 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Download the Propriologics App</h2>
      <p className="mb-6 text-lg">Get the app for Android below:</p>

      <div className="flex justify-center items-center gap-6 flex-wrap">
        {/* Google Play Store */}
        <a
          href="https://play.google.com/store/apps/details?id=com.yourapp.id"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            alt="Get it on Google Play"
            className="h-14"
          />
        </a>

        {/* Direct APK Download */}
        <a
          href="/apk/propriologics.apk"
          download
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded"
        >
          Download APK
        </a>
      </div>
    </section>
  );
};

export default DownloadPage;

