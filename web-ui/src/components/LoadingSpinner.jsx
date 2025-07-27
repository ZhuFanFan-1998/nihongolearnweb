function LoadingSpinner() {
    return (
        <div className="loader" style={{ 
            border: '4px solid #eee',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '20px auto'
        }}/>
    );
}

export default LoadingSpinner;