import { useCallback, useSyncExternalStore } from "react";

type LayoutOption = {
  label: string;
  value: string;
};

interface DevSwitcherGroupProps {
  param: string;
  label: string;
  options: readonly LayoutOption[];
}

function getSearchParam(param: string): string {
  if (typeof window === "undefined") return "";
  return new URL(window.location.href).searchParams.get(param) ?? "";
}

function setSearchParam(param: string, value: string) {
  const url = new URL(window.location.href);
  if (value) {
    url.searchParams.set(param, value);
  } else {
    url.searchParams.delete(param);
  }
  window.history.replaceState({}, "", url.toString());
  // Dispatch a custom event so all switchers re-render
  window.dispatchEvent(new CustomEvent("devswitcher:change"));
}

function subscribeToParam(callback: () => void) {
  window.addEventListener("devswitcher:change", callback);
  return () => window.removeEventListener("devswitcher:change", callback);
}

export function useDevSwitcher(param: string, defaultValue: string): [string, (value: string) => void] {
  const value = useSyncExternalStore(
    subscribeToParam,
    () => getSearchParam(param) || defaultValue,
    () => defaultValue,
  );

  const setValue = useCallback(
    (next: string) => {
      setSearchParam(param, next === defaultValue ? "" : next);
    },
    [param, defaultValue],
  );

  return [value, setValue];
}

const DevSwitcherGroup = ({ param, label, options }: DevSwitcherGroupProps) => {
  const [current, setCurrent] = useDevSwitcher(param, options[0].value);

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">{label}</span>
      <div className="flex gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setCurrent(opt.value)}
            className={`rounded-md px-2 py-0.5 font-mono text-[10px] transition-colors ${
              current === opt.value
                ? "bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/40"
                : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

interface DevSwitcherProps {
  groups: readonly DevSwitcherGroupProps[];
}

export const DevSwitcher = ({ groups }: DevSwitcherProps) => {
  if (typeof window === "undefined") return null;

  return (
    <div className="fixed bottom-4 left-4 z-9998 flex flex-col gap-3 rounded-xl border border-white/10 bg-black/80 p-3 backdrop-blur-xl">
      <span className="font-mono text-[10px] text-cyan-400/60 uppercase tracking-widest">Layout Preview</span>
      {groups.map((group) => (
        <DevSwitcherGroup key={group.param} {...group} />
      ))}
    </div>
  );
};
