import { FC, Fragment } from "react";
import { useApp } from "../../../../context/App";
import { LocaleLang } from "../../../../locale/index.type";
import SubItemsButton from "../../../Buttons/SubItemsButton";
import { Divider } from "../../../Divider";
import { SPACING } from "../../../Form/items/DefaultPropertyValues";
import Flag from "../../CountriesFlagIcon";
import StyledLink from "./Link";
import { Anchor } from "./styled";

const LocaleButton: FC = props => {
    const { locale: { labels, lang } } = useApp();
    const [_, origin, path] = new RegExp(`^(${document.location.origin}/).+(//?.+)`).exec(document.location.href) ?? ['', '', ''];
    const localesReferences = Object.keys(labels.langs).map(key => ({
        label: labels.langs[key as keyof typeof labels.langs],
        lang: key as LocaleLang,
        href: `${origin}${key}${path}`
    }));
    const selectedRef = localesReferences.find(ref => ref.lang === lang);
    return (
        <SubItemsButton
            label={(
                <StyledLink
                    href={selectedRef?.href ?? '/'}
                    selected={true}
                    label={(
                        <Fragment>
                            <Flag style={{ marginRight: SPACING.sm }} lang={selectedRef?.lang!} />
                            {selectedRef?.label}
                        </Fragment>
                    )}
                />
            )}
            renderItems={(
                <Fragment>
                    {localesReferences.map((ref, i) => (
                        lang !== ref.lang
                            ? (
                                <Fragment key={`locale-button-${i}`}>
                                    <Anchor
                                        href={ref.href}
                                        selected={lang === ref.lang}
                                        children={(
                                            <Fragment>
                                                <Flag style={{ marginRight: SPACING.sm }} lang={ref.lang} />
                                                {ref.label}
                                            </Fragment>
                                        )}
                                    />
                                    {(localesReferences[i + 1] && localesReferences[i + 1].lang !== lang) && <Divider />}
                                </Fragment>
                            )
                            : null
                    ))}
                </Fragment>
            )}
        />
    )
}

export default LocaleButton;