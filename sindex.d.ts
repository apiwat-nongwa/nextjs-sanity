export default PortableText;
export function blockContentToPlainText(blocks:? [any]): string;


declare function PortableText({content,className,serializers,...additionalOptions}: {
    content: [object];
    className: string;
    serializers: object;
    dataset: string;
    projectId: string;
}): any;

declare namespace PortableText {
    namespace propTypes {
        const content: any;
        const className: any;
        const serializers: any;
        const dataset: string;
        const projectId: string;
        
    }
}