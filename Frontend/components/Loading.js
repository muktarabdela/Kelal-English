// Loading.js
import { Loader } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center space-y-4">
            <Loader className="animate-spin text-primary" size={30} />
            <p className="text-lg font-medium text-primary"></p>
        </div>
    );
};

export default Loading;
