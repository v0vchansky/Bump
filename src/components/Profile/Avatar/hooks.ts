import * as React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';

import { IActionSheetVariant, useActionSheet } from '~/overlays/ActionSheet/ActionSheet';
import { deleteAvatar, uploadAvatar } from '~/store/user/actions';
import { getIsAvatarLoading } from '~/store/user/selectors/common';
import { getIsMe } from '~/store/user/selectors/me';
import { noop } from '~/utils/noop';

export const useAvatarHandlers = (avatarUrl: string | null, uuid: string) => {
    const dispatch = useDispatch();
    const { showActionSheet } = useActionSheet();

    const isMe = useSelector(getIsMe(uuid));

    const isAvatarResponseLoading = useSelector(getIsAvatarLoading);

    const showImagePicker = React.useCallback(() => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            cropperCancelText: 'Отмена',
            cropperChooseText: 'Выбрать',
            loadingLabelText: 'Загрузка...',
            mime: 'image/png',
            mediaType: 'photo',
        })
            .then(image => {
                dispatch(uploadAvatar(image));
            })
            .catch(noop);
    }, [dispatch]);

    const onAvatarClick = React.useCallback(() => {
        if (isAvatarResponseLoading || !isMe) {
            return;
        }

        const variants: IActionSheetVariant[] = [];

        if (avatarUrl) {
            variants.push(
                {
                    title: 'Изменить фото профиля',
                    onClick: () => {
                        showImagePicker();
                    },
                },
                {
                    title: 'Удалить фото профиля',
                    onClick: () => {
                        dispatch(deleteAvatar());
                    },
                },
            );
        } else {
            variants.push({
                title: 'Загрузить фото профиля',
                onClick: () => {
                    showImagePicker();
                },
            });
        }

        showActionSheet({ title: 'Изменить фото профиля', variants });
    }, [avatarUrl, dispatch, isAvatarResponseLoading, isMe, showActionSheet, showImagePicker]);

    return {
        onAvatarClick,
        isAvatarResponseLoading,
        activeOpacity: isAvatarResponseLoading || !isMe ? 1 : 0.85,
    };
};
