const ErrorsDisplay = ({ errors }) => {
    let errorsDisplay;

    if (errors.length) {
        errorsDisplay = (
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
        );

        return errorsDisplay;
    }
}

export default ErrorsDisplay;
