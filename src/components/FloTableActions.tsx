import { Button, Space, Tooltip, Dropdown, MenuProps } from "antd";
import { Key, ReactNode } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { IoMdMenu } from "react-icons/io";

export interface FloTableActionConfig {
    label: string;
    description?: string;
    handler: () => void;
    icon?: ReactNode;
    disabled?: boolean;
    loading?: boolean;
    type?: "default" | "primary" | "dashed" | "link" | "text";
    danger?: boolean;
    size?: "small" | "middle" | "large";
    className?: string;
}

interface FloTableActionProps {
    action: FloTableActionConfig;
}

export const FloTableAction = ({ action }: FloTableActionProps) => {
    const {
        label,
        description,
        handler,
        icon,
        disabled = false,
        loading = false,
        type = "default",
        danger = false,
        size = "middle",
        className = ""
    } = action;

    const button = (
        <Button
            type={type}
            danger={danger}
            size={size}
            icon={icon}
            loading={loading}
            disabled={disabled}
            onClick={handler}
            className={className}
        >
            {label}
        </Button>
    );

    if (description) {
        return <Tooltip title={description}>{button}</Tooltip>;
    }

    return button;
};

interface FloTableActionsProps {
    id: Key;
    actions: FloTableActionConfig[];
    maxVisibleActions?: number;
}

export const FloTableActions = ({
    id,
    actions,
    maxVisibleActions = 3
}: FloTableActionsProps) => {
    const isMobile = useIsMobile();

    if (!actions || actions.length === 0) {
        return null;
    }

    // On mobile or when there are many actions, show dropdown
    const shouldUseDropdown = isMobile || actions.length > maxVisibleActions;

    if (shouldUseDropdown) {
        const menuItems: MenuProps['items'] = actions.map((action, index) => ({
            key: `${id}-action-${index}`,
            label: action.label,
            icon: action.icon,
            disabled: action.disabled || action.loading,
            onClick: action.handler,
            danger: action.danger,
        }));

        return (
            <Dropdown
                menu={{ items: menuItems }}
                trigger={['click']}
                placement="bottomRight"
            >
                <Button icon={<IoMdMenu />} size={isMobile ? "small" : "middle"}>
                    Actions
                </Button>
            </Dropdown>
        );
    }

    // Desktop with few actions - show as buttons
    return (
        <Space size="small" wrap>
            {actions.map((action, index) => (
                <FloTableAction
                    key={`${id}-action-${index}`}
                    action={action}
                />
            ))}
        </Space>
    );
};