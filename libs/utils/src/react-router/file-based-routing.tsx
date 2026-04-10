import { lazy, LazyExoticComponent, ReactNode } from 'react';
import { ActionFunction, LoaderFunction, RouteObject } from 'react-router';

interface PageModuleExports {
  default: () => ReactNode;
  loader?: LoaderFunction;
  action?: ActionFunction;
}

interface LoadingModuleExports {
  default: () => ReactNode;
}

interface RouteHandle {
  pageType: 'page' | 'layout';
}

interface ExtendedRouteObject extends Omit<RouteObject, 'handle' | 'children'> {
  handle?: RouteHandle;
  children?: ExtendedRouteObject[];
  HydrateFallback?: React.ComponentType;
}

type PageModule = () => Promise<PageModuleExports>;

const separator = '\\';

export function convertPagesToRoute(
  files: Record<string, () => Promise<unknown>>,
  loadingFiles: Record<string, () => Promise<unknown>> = {}
): ExtendedRouteObject {
  let routes: ExtendedRouteObject = { path: '/' };
  Object.entries(files).forEach(([filePath, importer]) => {
    const segments = getRouteSegmentsFromFilePath(filePath);
    const page = lazy(importer as PageModule);
    const loadingComponent = findMatchingLoadingComponent(
      filePath,
      loadingFiles
    );
    const route = createRoute({
      PageComponent: page,
      LoadingComponent: loadingComponent,
      segments,
      async action(args) {
        const result = (await importer()) as PageModuleExports;
        return 'action' in result ? result.action?.(args) : null;
      },
      async loader(args) {
        const result = (await importer()) as PageModuleExports;
        return 'loader' in result ? result.loader?.(args) : null;
      },
      async guard() {
        return true;
      },
    });
    routes = mergeRoutes(routes, route);
  });
  return routes;
}

function findMatchingLoadingComponent(
  filePath: string,
  loadingFiles: Record<string, () => Promise<unknown>>
) {
  const loadingPath = filePath.replace(/(page|layout)\.tsx$/, 'loading.tsx');
  const groupMatch = filePath.match(/\([^/]+\//);
  const groupLoadingPath = groupMatch ? `/${groupMatch[0]}loading.tsx` : null;
  const globalLoadingPath = './app/loading.tsx';
  const loader =
    loadingFiles[loadingPath] ||
    (groupLoadingPath && loadingFiles[groupLoadingPath]) ||
    loadingFiles[globalLoadingPath];
  if (!loader) return undefined;
  return lazy(loader as () => Promise<LoadingModuleExports>);
}

function mergeRoutes(
  target: ExtendedRouteObject,
  source: ExtendedRouteObject
): ExtendedRouteObject {
  if (target.path !== source.path)
    throw new Error(
      `Paths do not match: "${target.path}" and "${source.path}"`
    );
  target.children = target.children || [];
  if (source.handle?.pageType === 'layout') {
    return handleLayoutMerge(target, source);
  }
  if (source.handle?.pageType === 'page') {
    return handlePageMerge(target, source);
  }
  if (source.children && source.children.length > 0) {
    if (target.handle?.pageType === 'page') {
      if (!target.children?.some((child) => child.index)) {
        target.children = target.children || [];
        target.children.unshift({
          index: true,
          element: target.element,
          HydrateFallback: target.HydrateFallback,
          action: target.action,
          loader: target.loader,
          handle: target.handle,
          errorElement: target.errorElement,
        });
      }
      delete target.element;
      delete target.action;
      delete target.loader;
      delete target.handle;
    }
    mergeChildRoutes(target, source);
  }
  return target;
}

export function mergeChildRoutes(
  target: ExtendedRouteObject,
  source: ExtendedRouteObject
): void {
  if (!source.children) return;
  if (!target.children) {
    target.children = [];
  }
  source.children.forEach((sourceChild) => {
    const matchingChild = target.children!.find(
      (targetChild) => targetChild.path === sourceChild.path
    );

    if (matchingChild) {
      mergeRoutes(matchingChild, sourceChild);
    } else {
      target.children!.push(sourceChild);
    }
  });
}

export function handleLayoutMerge(
  target: ExtendedRouteObject,
  source: ExtendedRouteObject
): ExtendedRouteObject {
  if (!target.element) {
    Object.assign(target, {
      element: source.element,
      HydrateFallback: source.HydrateFallback,
      action: source.action,
      loader: source.loader,
      handle: source.handle,
      errorElement: source.errorElement,
    });
  } else if (target.handle?.pageType === 'page') {
    target = swapTargetRouteAsIndexRouteAndUpdateWithRoute(target, source);
  }
  return target;
}

export function handlePageMerge(
  target: ExtendedRouteObject,
  source: ExtendedRouteObject
): ExtendedRouteObject {
  if (!target.children) {
    target.children = [];
  }
  if (
    !target.children.some((child) => child.index) ||
    target.handle?.pageType === 'layout'
  ) {
    if (target.handle?.pageType === 'layout') {
      addRouteAsIndexRouteForTargetRoute(target, source);
    } else {
      target.children.unshift({
        index: true,
        element: source.element,
        HydrateFallback: source.HydrateFallback,
        action: source.action,
        loader: source.loader,
        handle: source.handle,
        errorElement: source.errorElement,
      });
    }
  }
  return target;
}

export function swapTargetRouteAsIndexRouteAndUpdateWithRoute(
  target: ExtendedRouteObject,
  layout: ExtendedRouteObject
): ExtendedRouteObject {
  target.children = target.children || [];
  target.children.push({
    index: true,
    element: target.element,
    HydrateFallback: target.HydrateFallback,
    action: target.action,
    loader: target.loader,
    handle: target.handle,
    errorElement: target.errorElement,
  });
  Object.assign(target, {
    element: layout.element,
    HydrateFallback: layout.HydrateFallback,
    action: layout.action,
    loader: layout.loader,
    handle: layout.handle,
    errorElement: layout.errorElement,
  });
  return target;
}

export function addRouteAsIndexRouteForTargetRoute(
  target: ExtendedRouteObject,
  page: ExtendedRouteObject
): ExtendedRouteObject {
  target.children = target.children || [];
  target.children.push({
    index: true,
    element: page.element,
    HydrateFallback: page.HydrateFallback,
    action: page.action,
    loader: page.loader,
    handle: page.handle,
    errorElement: page.errorElement,
  });
  return target;
}

function createRoute(args: {
  segments: string[];
  PageComponent: LazyExoticComponent<() => ReactNode>;
  LoadingComponent?: LazyExoticComponent<() => ReactNode>;
  loader?: LoaderFunction;
  action?: ActionFunction;
  guard?: () => Promise<boolean>;
}): ExtendedRouteObject {
  const [current, ...rest] = args.segments;
  const [cleanPath, pageType] = current.split(separator);
  const route: ExtendedRouteObject = { path: cleanPath };
  if (pageType === 'page' || pageType === 'layout') {
    route.element = <args.PageComponent />;
    route.HydrateFallback =
      args.LoadingComponent ?? (() => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f9fafb' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, border: '3px solid #e5e7eb', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        </div>
      ));
    route.action = args.action;
    route.loader = async (...props) => {
      if (!(await args.guard?.())) {
        throw new Response('Forbidden', {
          status: 403,
          statusText: 'Forbidden',
        });
      }
      return args.loader?.(...props);
    };
    route.handle = { pageType: pageType as 'layout' | 'page' };
  }
  if (rest.length > 0) {
    const nextSegment = rest[0].split(separator)[0];
    if (nextSegment === 'update' || nextSegment === 'edit') {
      return {
        path: `${cleanPath}/${nextSegment}`,
        element: <args.PageComponent />,
        HydrateFallback: args.LoadingComponent ?? (() => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f9fafb' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, border: '3px solid #e5e7eb', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        </div>
      )),
        action: args.action,
        loader: args.loader,
        handle: { pageType: pageType as 'layout' | 'page' },
      };
    }
    const childRoute = createRoute({ ...args, segments: rest });
    if (!route.children) {
      route.children = [];
    }
    if (cleanPath.startsWith(':')) {
      route.children.unshift(childRoute);
    } else {
      route.children.push(childRoute);
    }
  }
  return route;
}

export function getRouteSegmentsFromFilePath(
  filePath: string,
  transformer = (segment: string, prevSegment: string) =>
    `${prevSegment}${separator}${getFileNameWithoutExtension(segment)}`
): string[] {
  const segments = filePath
    .replace('/app', '')
    .split('/')
    .filter(
      (segment) => !segment.startsWith('(index)') && !segment.startsWith('_')
    )
    .map((segment) => {
      if (segment.startsWith('.')) return '/';
      if (segment.startsWith('('))
        return (
          getParamFromSegment(segment).replace('(', '').replace(')', '') + '?'
        );
      if (segment.startsWith('[')) return getParamFromSegment(segment);
      return segment;
    });
  return getRouteSegments(segments[0], segments, transformer);
}

function getFileNameWithoutExtension(file: string) {
  return file.split('.')[0];
}

function getRouteSegments(
  segment: string,
  segments: string[],
  transformer: (seg: string, prev: string) => string,
  entries: string[] = [],
  index = 0
): string[] {
  if (index > segments.length)
    throw new Error('Cannot exceed total number of segments');
  if (index === segments.length - 1) {
    entries.push(transformer(segment, String(entries.pop())));
    return entries;
  }
  const nextIndex = index + 1;
  if (!segment.startsWith(':')) entries.push(segment);
  else entries.push(`${entries.pop()}/${segment}`);
  return getRouteSegments(
    segments[nextIndex],
    segments,
    transformer,
    entries,
    nextIndex
  );
}

function getParamFromSegment(segment: string) {
  if (segment.includes('...')) return '*';
  return segment.replace('[', ':').replace(']', '');
}

export function addErrorElementToRoutes(
  errorFiles: Record<string, () => Promise<unknown>>,
  routes: RouteObject
) {
  Object.entries(errorFiles).forEach(([filePath, importer]) => {
    const segments = getRouteSegmentsFromFilePath(
      filePath,
      (_, prevSegment) => prevSegment
    );
    const ErrorBoundary = lazy(
      importer as () => Promise<{ default: () => ReactNode }>
    );
    setRoute(segments, routes, (route) => {
      route.errorElement = <ErrorBoundary />;
      return route;
    });
  });
}

export function add404PageToRoutesChildren(
  notFoundFiles: Record<string, () => Promise<unknown>>,
  routes: RouteObject
) {
  Object.entries(notFoundFiles).forEach(([filePath, importer]) => {
    const segments = getRouteSegmentsFromFilePath(
      filePath,
      (_, prevSegment) => prevSegment
    );
    const NotFound = lazy(
      importer as () => Promise<{ default: () => ReactNode }>
    );
    setRoute(segments, routes, (route) => {
      if (route.children) {
        set404NonPage(routes, <NotFound />);
        route.children.push({ path: '*', element: <NotFound /> });
      } else {
        const tempRoute = Object.assign({}, route);
        route.children = route.children ?? [];
        route.children.push({
          index: true,
          element: tempRoute.element,
          action: tempRoute.action,
          loader: tempRoute.loader,
        });
        route.children.push({ path: '*', element: <NotFound /> });
        delete route.element;
        delete route.action;
        delete route.loader;
      }
      return route;
    });
  });
}

function set404NonPage(routes: RouteObject, notFoundElement: ReactNode) {
  if (
    routes.path &&
    routes.children?.length &&
    !routes.path.includes('?') &&
    !routes.path.includes('/') &&
    !routes.children.some((child) => child.index)
  ) {
    routes.children.push({
      index: true,
      element: notFoundElement,
    });
  }
  routes.children?.forEach((route) => set404NonPage(route, notFoundElement));
}

function setRoute(
  segments: string[],
  route: RouteObject,
  updater: (route: RouteObject) => RouteObject
): void {
  let temp = route;
  segments.forEach((_segment, i) => {
    const isLastSegment = i === segments.length - 1;
    if (isLastSegment) return (temp = updater(temp));
    if (!isLastSegment) {
      const nextSegment = segments[i + 1];
      const index = temp.children?.findIndex(
        (child) => child.path === nextSegment
      );
      if (typeof index !== 'number' || index === -1) {
        const msg = `Segment ${nextSegment} does not exist among the children of route with path ${temp.path}`;
        throw new Error(msg);
      }
      temp = temp.children?.[index] as RouteObject;
    }
  });
}
