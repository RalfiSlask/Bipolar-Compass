import RoundedImageWithHeadingList from "../components/shared/RoundedImageWithHeadingList";

const ChallengesForRelatives = () => {
  return (
    <RoundedImageWithHeadingList
      title=" Vanliga utmaningar för anhöriga"
      headingsList={[
        {
          title: "Känslomässig belastning",
          description:
            "Du kan känna frustration eller maktlöshet när din närstående inte mår bra. Det är viktigt att erkänna dessa känslor som normala och söka stöd vid behov.",
        },
        {
          title: "Oro för framtiden",
          description:
            "Det är naturligt att känna oro för hur sjukdomen kommer påverka er relation, din närståendes arbete eller ekonomi. Genom att skapa en stabil stödstruktur kan ni minska dessa risker.",
        },
        {
          title: "Social isolering",
          description:
            "Många anhöriga upplever att de själva blir isolerade när deras närstående är sjuk. Det är viktigt att du hittar egna sociala sammanhang där du kan få energi.",
        },
      ]}
      image="/images/relatives/struggle.webp"
      type="tertiary"
      imageAlt="Stress"
      linkText="självhjälp"
      link="/behandling/sjalvhjalp"
    />
  );
};

export default ChallengesForRelatives;
