type FieldErrorsProps = {
    errors: string[]
}

export function FieldErrors({ errors }: FieldErrorsProps) {
    return (
        <>
            {errors.map(error => (
                <p key={error} className="text-sm text-red-600 px-2">{error}</p>
            ))}
        </>
    )
}