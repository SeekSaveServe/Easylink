import Tag from "./Tag/Tag";

export default function StatusTag({ linkinSlice, sx }) {
    const isLink = linkinSlice != undefined;
    if (!isLink) return <></>;
    console.log(linkinSlice)
    if (linkinSlice.established) {
      return (
        <Tag
          color="var(--primary)"
          fontColor={"white"}
          sx={{ fontSize: "0.7rem", alignSelf: "flex-start", mt: 3, ...sx}}
        >
          Linked
        </Tag>
      );
    }

    if (linkinSlice.pending) {
      return (
        <Tag
          color={linkinSlice.incoming ? "var(--secondary)" : "var(--primary)"}
          fontColor={"white"}
          sx={{ fontSize: "0.7rem", alignSelf: "flex-start", mt: 3, ...sx }}
        >
          {linkinSlice.incoming ? "Incoming Request" : "Outgoing Request"}
        </Tag>
      );
    }

    if (linkinSlice.rejected) {
      return (
        <Tag
          color={"error.main"}
          fontColor={"white"}
          sx={{ fontSize: "0.7rem", alignSelf: "flex-start", mt: 3, ...sx  }}
        >
          {linkinSlice.incoming ? "You rejected" : "They rejected"}
        </Tag>
      );
    }

    return <></>;
  }