
function DropZoneIcon({ isDragOver }) {
    const strokeColor = isDragOver ? "#edbf68" : "#584332";

    return (
        <div className="empty-cart">
            <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: isDragOver ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s ease-in-out' }}
            >
                <path
                    d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V7Z"
                    stroke={strokeColor}
                    strokeWidth={isDragOver ? "2" : "1.5"}
                    strokeLinecap="round"
                />
                <path
                    d="M12 9V14M12 14L9 11M12 14L15 11"
                    stroke={strokeColor}
                    strokeWidth={isDragOver ? "2" : "1.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <p className="drop-placeholder" style={{
                color: strokeColor,
                fontSize: isDragOver ? '1.2em' : '1em',
                transition: 'color 0.2s ease-in-out, font-size 0.2s ease-in-out'
            }}>{isDragOver ? 'Drop here!' : 'Drag product here'}</p>
        </div>
    );
}

export default DropZoneIcon;
