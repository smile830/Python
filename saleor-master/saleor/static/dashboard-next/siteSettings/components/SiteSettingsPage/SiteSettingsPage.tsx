import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import Container from "../../../components/Container";
import Form from "../../../components/Form";
import PageHeader from "../../../components/PageHeader";
import SaveButtonBar from "../../../components/SaveButtonBar";
import i18n from "../../../i18n";
import { maybe } from "../../../misc";
import { AuthorizationKeyType } from "../../../types/globalTypes";
import { SiteSettings_shop } from "../../types/SiteSettings";
import SiteSettingsDetails from "../SiteSettingsDetails/SiteSettingsDetails";
import SiteSettingsKeys from "../SiteSettingsKeys/SiteSettingsKeys";

export interface SiteSettingsPageFormData {
  description: string;
  domain: string;
  name: string;
}

export interface SiteSettingsPageProps {
  disabled: boolean;
  errors: Array<{
    field: string;
    message: string;
  }>;
  shop: SiteSettings_shop;
  onBack: () => void;
  onKeyAdd: () => void;
  onKeyRemove: (keyType: AuthorizationKeyType) => void;
  onSubmit: (data: SiteSettingsPageFormData) => void;
}

const decorate = withStyles(theme => ({
  root: {
    display: "grid" as "grid",
    gridColumnGap: theme.spacing.unit * 2 + "px",
    gridRowGap: theme.spacing.unit * 3 + "px",
    gridTemplateColumns: "4fr 9fr"
  }
}));
const SiteSettingsPage = decorate<SiteSettingsPageProps>(
  ({
    classes,
    disabled,
    errors,
    shop,
    onBack,
    onKeyAdd,
    onKeyRemove,
    onSubmit
  }) => {
    const initialForm: SiteSettingsPageFormData = {
      description: maybe(() => shop.description, ""),
      domain: maybe(() => shop.domain.host, ""),
      name: maybe(() => shop.name, "")
    };
    return (
      <Form
        errors={errors}
        initial={initialForm}
        onSubmit={onSubmit}
        key={JSON.stringify(shop)}
      >
        {({ change, data, errors: formErrors, hasChanged, submit }) => (
          <Container width="md">
            <PageHeader
              title={i18n.t("General Information", {
                context: "page header"
              })}
            />
            <div className={classes.root}>
              <Typography variant="title">{i18n.t("Site Settings")}</Typography>
              <SiteSettingsDetails
                data={data}
                errors={formErrors}
                disabled={disabled}
                onChange={change}
              />
              <Typography variant="title">
                {i18n.t("Authentication keys")}
              </Typography>
              <SiteSettingsKeys
                disabled={disabled}
                keys={maybe(() => shop.authorizationKeys)}
                onAdd={onKeyAdd}
                onRemove={onKeyRemove}
              />
            </div>
            <SaveButtonBar
              disabled={disabled || !hasChanged}
              onCancel={onBack}
              onSave={submit}
            />
          </Container>
        )}
      </Form>
    );
  }
);
SiteSettingsPage.displayName = "SiteSettingsPage";
export default SiteSettingsPage;
