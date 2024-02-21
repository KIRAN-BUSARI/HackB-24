import React, { useState, useEffect } from "react";

const Sphere = ({ delay }) => {
    const [isUp, setIsUp] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsUp(!isUp);
        }, 500 + delay);
        return () => clearInterval(interval);
    }, [isUp, delay]);

    return (
        <div
            className={`absolute top-1/2 bg-slate-900 space-x-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full animate-bounce ${isUp ? "translate-y-0" : "translate-y-full"}`}
        ></div>
    );
};

const Loader = () => {
    return (
        <div className="flex justify-center space-x-28">
            <Sphere delay={0} />
            <Sphere delay={100} />
            <Sphere delay={200} />
            <Sphere delay={300} />
        </div>
    );
};

export default Loader;
