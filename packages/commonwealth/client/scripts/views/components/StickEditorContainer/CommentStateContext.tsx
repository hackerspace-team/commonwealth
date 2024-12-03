import { useFlag } from 'hooks/useFlag';
import React, {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type Activator = {
  activeElement: ReactNode | null;
  defaultElement: ReactNode | null;
  setDefaultElement: (node: ReactNode) => void;
  setActiveElement: (node: ReactNode) => void;
};

const NULL_FUNCTION = () => {};

const ActivatorContext = createContext<Activator>({
  defaultElement: null,
  activeElement: null,
  setDefaultElement: NULL_FUNCTION,
  setActiveElement: NULL_FUNCTION,
});

function useActivatorContext() {
  return useContext(ActivatorContext);
}

export function useActiveStickCommentReset() {
  const activatorContext = useActivatorContext();

  return useCallback(() => {
    activatorContext.setActiveElement(null);
  }, [activatorContext]);
}

type Props = {
  children: ReactNode;
};

/**
 * The provider which has to wrap our entire comment reply system.
 */
export const StickCommentProvider = memo(function StickCommentProvider(
  props: Props,
) {
  const [defaultElement, setDefaultElement] = useState<ReactNode | null>(null);
  const [activeElement, setActiveElement] = useState<ReactNode | null>(null);

  return (
    <ActivatorContext.Provider
      value={{
        defaultElement,
        setDefaultElement,
        activeElement,
        setActiveElement,
      }}
    >
      {props.children}
    </ActivatorContext.Provider>
  );
});

/**
 * The default sticky comment.  This needs to wrap the main comment reply.
 */
// eslint-disable-next-line react/no-multi-comp
export const WithDefaultStickyComment = memo(function WithDefaultStickyComment(
  props: Props,
) {
  const { children } = props;

  const activator = useActivatorContext();

  useEffect(() => {
    activator.setDefaultElement(children);

    return () => {
      activator.setDefaultElement(null);
    };
  }, [children, activator]);

  return null;
});

/**
 * We need to wrap our comment reply in this so that when the user hits reply
 * it overrides the main comment post.
 */
// eslint-disable-next-line react/no-multi-comp
export const WithActiveStickyComment = memo(function WithActiveStickyComment(
  props: Props,
) {
  const { children } = props;

  const stickyEditor = useFlag('stickyEditor');

  const activator = useActivatorContext();

  useEffect(() => {
    if (!stickyEditor) {
      return;
    }

    activator.setActiveElement(children);

    return () => {
      activator.setActiveElement(null);
    };
  }, [children, activator]);

  return stickyEditor ? null : props.children;
});

/**
 * This is the main element that we need to actually stick to the screen.
 *
 * This will first, try to display the active element (the comment reply), then
 * fall back to the default element (the main comment), or if nothing is being
 * used just return nothing.
 */
// eslint-disable-next-line react/no-multi-comp
export const StickyCommentElementSelector = memo(
  function StickyCommentElementSelector() {
    const activator = useActivatorContext();

    if (activator.activeElement) {
      return <>{activator.activeElement}</>;
    }

    if (activator.defaultElement) {
      return <>{activator.defaultElement}</>;
    }

    return null;
  },
);
