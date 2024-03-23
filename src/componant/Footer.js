import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [ t, i18n ] = useTranslation("global");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            {t("footer.copyright")} &copy; {t("header.brandName")}
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <Button variant="link" onClick={() => changeLanguage("en")}>
              English
            </Button>

            <Button variant="link" onClick={() => changeLanguage("gm")}>
             Germany
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
