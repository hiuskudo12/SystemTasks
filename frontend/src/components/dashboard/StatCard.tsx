interface StatCardProps {

    title: string;

    value: number;

}

export default function StatCard({

    title,

    value,

}: StatCardProps) {

    return (

        <div className="rounded-2xl bg-white p-6 shadow">

            <p className="text-gray-500">

                {title}

            </p>

            <h2 className="mt-3 text-3xl font-bold text-blue-600">

                {value}

            </h2>

        </div>

    );

}