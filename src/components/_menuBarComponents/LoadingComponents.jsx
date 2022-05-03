import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoadingComponents() {
  return (
    <div className="LoadingComponents">
      <FontAwesomeIcon icon={faSpinner} className="loadingIcon" />
    </div>
  );
}
