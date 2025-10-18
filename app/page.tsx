import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="apple-title-large mb-6 text-gray-900 leading-tight">
            Trade in your iPhone.
            <br />
            <span className="text-blue-600">Upgrade with ease.</span>
          </h1>
          <p className="apple-headline text-gray-600 mb-10 max-w-2xl mx-auto">
            Get an instant estimate for your current iPhone and find your perfect upgrade. 
            Fair prices, expert inspection, seamless process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/tradein" legacyBehavior>
              <a className="apple-button-primary text-lg px-8 py-4">
                Get Your Estimate
              </a>
            </Link>
            <Link href="#how-it-works" legacyBehavior>
              <a className="apple-button-secondary text-lg px-8 py-4">
                Learn More
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="apple-title mb-4">How it works</h2>
            <p className="apple-body text-gray-600 max-w-2xl mx-auto">
              Trading in your iPhone has never been simpler. Follow these three easy steps to upgrade.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="apple-headline font-semibold text-blue-600">1</span>
              </div>
              <h3 className="apple-headline mb-3">Tell us about your iPhone</h3>
              <p className="apple-body text-gray-600">
                Answer a few questions about your current iPhone's condition to get an instant estimate.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="apple-headline font-semibold text-blue-600">2</span>
              </div>
              <h3 className="apple-headline mb-3">Choose your new iPhone</h3>
              <p className="apple-body text-gray-600">
                Browse our selection of premium used and brand new iPhones to find your perfect upgrade.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="apple-headline font-semibold text-blue-600">3</span>
              </div>
              <h3 className="apple-headline mb-3">Schedule your appointment</h3>
              <p className="apple-body text-gray-600">
                Book a convenient time for our expert to inspect your device and complete the trade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="apple-title mb-4">Ready to upgrade?</h2>
          <p className="apple-body text-gray-600 mb-8">
            Start your trade-in process now and discover how much your iPhone is worth.
          </p>
          <Link href="/tradein" legacyBehavior>
            <a className="apple-button-primary text-lg px-8 py-4">
              Start Trade-In Process
            </a>
          </Link>
        </div>
      </section>
    </main>
  );
}


