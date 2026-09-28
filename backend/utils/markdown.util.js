const cleanMarkdown = (content) => {
    if (!content) {
        return "";
    }

    let text = content;

    // Remove escaped HTML line breaks
    text = text.replace(/\\<br\s*\\?\/?>/gi, "\n");

    // Remove normal HTML line breaks
    text = text.replace(/<br\s*\/?>/gi, "\n");

    // Detect and convert Markdown tables
    const lines = text.split("\n");
    const cleanedLines = [];

    let i = 0;

    while (i < lines.length) {
        const currentLine = lines[i].trim();
        const nextLine = lines[i + 1]?.trim();

        const isTableHeader =
            currentLine.includes("|") &&
            nextLine &&
            /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(
                nextLine
            );

        if (isTableHeader) {
            const headers = currentLine
                .replace(/^\||\|$/g, "")
                .split("|")
                .map((item) => item.trim());

            i += 2;

            while (i < lines.length) {
                const row = lines[i].trim();

                if (
                    !row ||
                    !row.includes("|")
                ) {
                    break;
                }

                const values = row
                    .replace(/^\||\|$/g, "")
                    .split("|")
                    .map((item) => item.trim());

                if (values.length === 0) {
                    break;
                }

                const title = headers[0] || "Information";

                cleanedLines.push(
                    `### ${values[0] || title}`
                );

                for (
                    let j = 1;
                    j < values.length;
                    j++
                ) {
                    if (
                        headers[j] &&
                        values[j]
                    ) {
                        cleanedLines.push(
                            `- **${headers[j]}:** ${values[j]}`
                        );
                    }
                }

                cleanedLines.push("");

                i++;
            }

            continue;
        }

        cleanedLines.push(lines[i]);

        i++;
    }

    text = cleanedLines.join("\n");

    // Fix escaped Markdown pipes that remain
    text = text.replace(/\\\|/g, "|");

    // Remove excessive blank lines
    text = text.replace(/\n{3,}/g, "\n\n");

    return text.trim();
};

module.exports = {
    cleanMarkdown
};