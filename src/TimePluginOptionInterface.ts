export default interface TimePluginOptionInterface {
    /** Colors the output. Colors are still left out if the terminal does not support them or NO_COLOR is set. */
    colors?: boolean;
    /** Receives every line of output. Defaults to console.log. */
    logger?: (message: string) => void;
    /** Name of the build in the output. */
    name?: string;
}
