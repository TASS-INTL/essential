

export const ButtonOlympoUI = ({ handleOnClick, text }) => {
    return (
        <button
            onClick={handleOnClick}
            className="fixed bottom-8 right-8 bg-black text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
            {text}
        </button>
    )
}