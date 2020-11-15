class CustomError extends Error {
	constructor(message: string, status: number) {
		super();

		Error.captureStackTrace(this, this.constructor);
		this.name = 'CustomError';
		this.message = message;

		if (typeof status !== 'undefined') this.status = status;
	}

	status?: number;
}

export default CustomError;
