import { useState, useEffect } from 'react';
import { Car, carService } from '../services/api';
import { CarForm } from './CarForm';

export const Cars = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCars = async () => {
        try {
            const data = await carService.getAllCars();
            setCars(data);
        } catch (err) {
            setError('Error loading cars');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCars();
    }, []);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Car Management</h1>
            
            <CarForm onCarAdded={loadCars} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {cars.map(car => (
                    <div key={car.id} className="border rounded-lg p-4 shadow">
                        <h2 className="text-xl font-semibold">{car.make} {car.model}</h2>
                        <p className="text-gray-600">Year: {car.year}</p>
                        <p className="text-green-600 font-bold">Price: ${car.price}</p>
                        {car.description && (
                            <p className="text-gray-500 mt-2">{car.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};