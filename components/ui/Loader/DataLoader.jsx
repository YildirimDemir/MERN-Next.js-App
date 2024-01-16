import Style from "./loader.module.css";

export default function DataLoader() {

    return (
        <div style={{ width: "100%", height: "50rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className={Style.spinner}></div>
        </div>
    )
}
