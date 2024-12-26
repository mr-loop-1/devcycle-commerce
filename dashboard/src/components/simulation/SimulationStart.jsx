import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function SimulationStart({}) {
  return (
    <div className="border rounded-xl px-4 py-4">
      <span className="flex flex-col">
        <span className="">
          <img src="/flower.svg" className="inline w-5 h-5 mr-2" />
          Welcome to the live-sale simulation of Devcycle Commerce.{' '}
        </span>
        <span className="mt-2">
          You play as the Sales Admin of this new Apparal Company having their
          first ever sale on the New Year Eve. The feature flags will need to be
          set to default variations as decided by the department. The country is
          defaulted to India <img src="/in.svg" className="inline w-4 h-4" />
        </span>
        <span className="mt-2">
          A dedicated analysis team will be guiding you giving important
          insights and suggestions.
        </span>{' '}
        <span className="mt-2 font-medium">
          It is a success when all the metrics are performing normally. On the
          contrary, a negative metric for too long or timer (of 5 minutes)
          running out will close the simulation.
        </span>
      </span>
      <Dialog>
        <DialogTrigger className="text-blue-700 mt-2  text-sm">
          click here for game theory
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Game Theory</DialogTitle>
            <DialogDescription className="text-base py-6 text-gray-600">
              <div className="">
                The simulation uses 5 variables for affecting the metrics namely{' '}
                <span className="text-lime-700 font-semibold">
                  sort-strategy
                </span>{' '}
                <span className="text-pink-700 font-semibold font-mono">
                  (popular)
                </span>
                , <span className="text-lime-700 font-semibold">cart-page</span>{' '}
                <span className="text-pink-700 font-semibold font-mono">
                  (true)
                </span>
                ,{' '}
                <span className="text-lime-700 font-semibold">
                  recommend-page
                </span>{' '}
                <span className="text-pink-700 font-semibold font-mono">
                  (true)
                </span>
                ,{' '}
                <span className="text-lime-700 font-semibold">
                  (shipping-waiver)
                </span>{' '}
                <span className="text-pink-700 font-semibold font-mono">
                  (none)
                </span>{' '}
                and{' '}
                <span className="text-lime-700 font-semibold">
                  (chatbot-status)
                </span>{' '}
                <span className="text-pink-700 font-semibold font-mono">
                  (true)
                </span>
                .
              </div>

              <div className="mt-4">
                The simulation tolerates only 2 actions avoiding a flagged
                metric. Two units of inaction will lead to game over.
              </div>

              <div className="mt-4">
                Flaggable feature variatons, if repeated after fix, will lead to
                repeat of the insight. Hence, combined with the 2 tolerable
                other actions, there may be a long simulation made out of this.
              </div>
              <div className="">Metric dependeny</div>
              <div className="mt-4">
                1. Both{' '}
                <span className="text-lime-700 font-semibold">cart-page</span>{' '}
                and{' '}
                <span className="text-lime-700 font-semibold">
                  recommend-page
                </span>{' '}
                affect the single metric of cart-abandons.
              </div>
              <div className="mt-4">
                2. checkout-abandon metric is affected by{' '}
                <span className="text-lime-700 font-semibold">
                  shipping-waiver
                </span>{' '}
                variable.
              </div>
              <div className="mt-4">
                3.{' '}
                <span className="text-lime-700 font-semibold">
                  sort-startegy
                </span>{' '}
                <span className="text-pink-700 font-semibold font-mono">
                  stock
                </span>{' '}
                is required for solving the cancellations problem due to
                out-of-stock.
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
