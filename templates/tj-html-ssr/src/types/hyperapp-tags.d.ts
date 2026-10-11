// An action-free tree can be embedded in an app with any state type.
type PassiveProps = import("hyperapp").Props<any> & {
  [K in keyof import("hyperapp").EventActions<any>]?: never
}

type PassiveChild = boolean | null | undefined | import("hyperapp").TextVNode | PassiveVNode
type PassiveChildren = PassiveChild | readonly PassiveChild[]

type PassiveVNode = Omit<
  import("hyperapp").ElementVNode<any>,
  "props" | "children" | "events" | "tag" | "memo"
> & {
  readonly props: PassiveProps
  readonly children: readonly PassiveChild[]
  readonly tag: string
  events?: never
  memo?: never
}

type HyperappChildren<S> =
  | import("hyperapp").MaybeVNode<S>
  | PassiveChild
  | readonly (import("hyperapp").MaybeVNode<S> | PassiveChild)[]

interface HyperappTag {
  (props: PassiveProps, children?: PassiveChildren): PassiveVNode
  (children: PassiveChildren): PassiveVNode
  <S>(props: import("hyperapp").Props<S>, children?: HyperappChildren<S>): import("hyperapp").ElementVNode<S>
  <S>(children: import("hyperapp").VNode<S> | readonly (import("hyperapp").MaybeVNode<S> | PassiveChild)[]): import("hyperapp").ElementVNode<S>
}

interface HyperappHtmlTag extends HyperappTag {
  (): PassiveVNode
}
