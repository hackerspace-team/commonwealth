/* eslint-disable @typescript-eslint/ban-types */
import $ from 'jquery';
import m from 'mithril';
import app from 'state';
import { Button, Table } from 'construct-ui';

import { ChainBase, ChainCategoryType, ChainNetwork } from 'types';
import { notifyError, notifySuccess } from 'controllers/app/notifications';
import { InputRow, ToggleRow } from 'views/components/metadata_rows';
import AvatarUpload, { AvatarScope } from 'views/components/avatar_upload';

import { ChainInfo } from 'client/scripts/models';
import ManageRolesRow from './manage_roles_row';
import { buildChainToCategoriesMap } from '../community_cards';
import { CWButton } from '../../components/component_kit/cw_button';

interface IChainOrCommMetadataManagementAttrs {
  chain?: ChainInfo;
  onRoleUpdate: Function;
  admins;
  mods;
}

interface IChainMetadataManagementState {
  name: string;
  description: string;
  website: string;
  discord: string;
  element: string;
  telegram: string;
  github: string;
  url: string;
  loadingFinished: boolean;
  loadingStarted: boolean;
  iconUrl: string;
  stagesEnabled: boolean;
  customStages: string;
  customDomain: string;
  terms: string;
  defaultSummaryView: boolean;
  network: ChainNetwork;
  symbol: string;
  snapshot: string[];
  selectedTags: { [type in ChainCategoryType]?: boolean };
  categoryMap: { [type in ChainCategoryType]?: number };
  uploadInProgress: boolean;
}

const setChainCategories = async (
  chain_id: string,
  category_type_id: number,
  create: boolean
) => {
  return new Promise<void>((resolve, reject) => {
    const params = {
      chain_id,
      category_type_id,
      create,
      auth: true,
      jwt: app.user.jwt,
    };
    $.post(`${app.serverUrl()}/updateChainCategory`, params)
      .then((response) => {
        if (create && response.result) {
          app.config.chainCategories = app.config.chainCategories.concat([
            {
              id: response.result.id,
              chain_id: response.result.chain_id,
              category_type_id: response.result.category_type_id,
            },
          ]);
        } else if (!create) {
          app.config.chainCategories = app.config.chainCategories.filter(
            (data) => data.id != response.result.id
          );
        }
        resolve();
        m.redraw();
      })
      .catch((err) => {
        reject();
      });
  });
};

const setSelectedTags = (chain: string) => {
  const categoryTypes = app.config.chainCategoryTypes;
  const chainsAndCategories = app.config.chainCategories;
  const chainToCategoriesMap: { [chain: string]: ChainCategoryType[] } =
    buildChainToCategoriesMap(categoryTypes, chainsAndCategories);

  const types = Object.keys(ChainCategoryType);
  let selectedTags = {};
  for (const type of types) {
    selectedTags[type] = false;
  }

  if (chainToCategoriesMap[chain]) {
    for (const tag of chainToCategoriesMap[chain]) {
      selectedTags[tag] = true;
    }
  }

  return selectedTags;
};

const buildCategoryMap = () => {
  const categoryTypes = app.config.chainCategoryTypes;
  let categoryMap = {};
  for (const data of categoryTypes) {
    categoryMap[data.category_name] = data.id;
  }
  return categoryMap;
};

const ChainMetadataManagementTable: m.Component<
  IChainOrCommMetadataManagementAttrs,
  IChainMetadataManagementState
> = {
  oninit: (vnode) => {
    vnode.state.name = vnode.attrs.chain.name;
    vnode.state.description = vnode.attrs.chain.description;
    vnode.state.website = vnode.attrs.chain.website;
    vnode.state.discord = vnode.attrs.chain.discord;
    vnode.state.element = vnode.attrs.chain.element;
    vnode.state.telegram = vnode.attrs.chain.telegram;
    vnode.state.github = vnode.attrs.chain.github;
    vnode.state.stagesEnabled = vnode.attrs.chain.stagesEnabled;
    vnode.state.customStages = vnode.attrs.chain.customStages;
    vnode.state.customDomain = vnode.attrs.chain.customDomain;
    vnode.state.terms = vnode.attrs.chain.terms;
    vnode.state.iconUrl = vnode.attrs.chain.iconUrl;
    vnode.state.network = vnode.attrs.chain.network;
    vnode.state.symbol = vnode.attrs.chain.symbol;
    vnode.state.snapshot = vnode.attrs.chain.snapshot;
    vnode.state.defaultSummaryView = vnode.attrs.chain.defaultSummaryView;
    vnode.state.selectedTags = setSelectedTags(vnode.attrs.chain.id);
    vnode.state.categoryMap = buildCategoryMap();
  },
  view: (vnode: any) => {
    return m('.ChainMetadataManagementTable', [
      m(AvatarUpload, {
        avatarScope: AvatarScope.Chain,
        uploadStartedCallback: () => {
          vnode.state.uploadInProgress = true;
          m.redraw();
        },
        uploadCompleteCallback: (files) => {
          files.forEach((f) => {
            if (!f.uploadURL) return;
            const url = f.uploadURL.replace(/\?.*/, '');
            vnode.state.iconUrl = url;
            $(vnode.dom).find('input[name=avatarUrl]').val(url.trim());
          });
          vnode.state.uploadInProgress = false;
          m.redraw();
        },
      }),
      m(
        Table,
        {
          bordered: false,
          interactive: false,
          striped: false,
          class: 'metadata-management-table',
        },
        [
          m(InputRow, {
            title: 'Name',
            defaultValue: vnode.state.name,
            onChangeHandler: (v) => {
              vnode.state.name = v;
            },
          }),
          m(InputRow, {
            title: 'Description',
            defaultValue: vnode.state.description,
            onChangeHandler: (v) => {
              vnode.state.description = v;
            },
            textarea: true,
          }),
          m(InputRow, {
            title: 'Website',
            defaultValue: vnode.state.website,
            placeholder: 'https://example.com',
            onChangeHandler: (v) => {
              vnode.state.website = v;
            },
          }),
          m(InputRow, {
            title: 'Discord',
            defaultValue: vnode.state.discord,
            placeholder: 'https://discord.com/invite',
            onChangeHandler: (v) => {
              vnode.state.discord = v;
            },
          }),
          m(InputRow, {
            title: 'Element',
            defaultValue: vnode.state.element,
            placeholder: 'https://matrix.to/#',
            onChangeHandler: (v) => {
              vnode.state.element = v;
            },
          }),
          m(InputRow, {
            title: 'Telegram',
            defaultValue: vnode.state.telegram,
            placeholder: 'https://t.me',
            onChangeHandler: (v) => {
              vnode.state.telegram = v;
            },
          }),
          m(InputRow, {
            title: 'Github',
            defaultValue: vnode.state.github,
            placeholder: 'https://github.com',
            onChangeHandler: (v) => {
              vnode.state.github = v;
            },
          }),
          m(ToggleRow, {
            title: 'Stages',
            defaultValue: vnode.attrs.chain.stagesEnabled,
            onToggle: (checked) => {
              vnode.state.stagesEnabled = checked;
            },
            caption: (checked) =>
              checked
                ? 'Show proposal progress on threads'
                : "Don't show progress on threads",
          }),
          m(ToggleRow, {
            title: 'Summary view',
            defaultValue: vnode.attrs.chain.defaultSummaryView,
            onToggle: (checked) => {
              vnode.state.defaultSummaryView = checked;
            },
            caption: (checked) =>
              checked
                ? 'Discussion listing defaults to summary view'
                : 'Discussion listing defaults to latest activity view',
          }),
          m(InputRow, {
            title: 'Custom Stages',
            defaultValue: vnode.state.customStages,
            placeholder: '["Temperature Check", "Consensus Check"]',
            onChangeHandler: (v) => {
              vnode.state.customStages = v;
            },
          }),
          m(InputRow, {
            title: 'Domain',
            defaultValue: vnode.state.customDomain,
            placeholder: 'Contact support', // gov.edgewa.re
            onChangeHandler: (v) => {
              vnode.state.customDomain = v;
            },
            disabled: true, // Custom domains should be admin configurable only
          }),
          app.chain?.meta.chain.base === ChainBase.Ethereum &&
            m(InputRow, {
              title: 'Snapshot(s)',
              defaultValue: vnode.state.snapshot,
              placeholder: vnode.state.network,
              onChangeHandler: (v) => {
                const snapshots = v
                  .split(',')
                  .map((val) => val.trim())
                  .filter((val) => val.length > 4);
                vnode.state.snapshot = snapshots;
              },
            }),
          m(InputRow, {
            title: 'Terms of Service',
            defaultValue: vnode.state.terms,
            placeholder: 'Url that new users see',
            onChangeHandler: (v) => {
              vnode.state.terms = v;
            },
          }),
          m('.tag-row', [
            m('label', 'Community Tags'),
            m('.tag-group', [
              Object.keys(vnode.state.selectedTags).map((key) => {
                return m(CWButton, {
                  label: key,
                  className: 'filter-button',
                  buttonType: vnode.state.selectedTags[key]
                    ? 'primary'
                    : 'secondary',
                  onclick: () => {
                    vnode.state.selectedTags[key] =
                      !vnode.state.selectedTags[key];
                  },
                });
              }),
            ]),
          ]),
          m('tr', [
            m('td', 'Admins'),
            m('td', [
              m(ManageRolesRow, {
                roledata: vnode.attrs.admins,
                onRoleUpdate: (x, y) => {
                  vnode.attrs.onRoleUpdate(x, y);
                },
              }),
            ]),
          ]),
          vnode.attrs.mods.length > 0 &&
            m('tr', [
              m('td', 'Moderators'),
              m('td', [
                m(ManageRolesRow, {
                  roledata: vnode.attrs.mods,
                  onRoleUpdate: (x, y) => {
                    vnode.attrs.onRoleUpdate(x, y);
                  },
                }),
              ]),
            ]),
        ]
      ),
      m('.button-wrap', [
        m(Button, {
          class: 'save-changes-button',
          disabled: vnode.state.uploadInProgress,
          label: 'Save changes',
          intent: 'primary',
          onclick: async (e) => {
            const {
              name,
              description,
              website,
              discord,
              element,
              telegram,
              github,
              stagesEnabled,
              customStages,
              customDomain,
              snapshot,
              terms,
              iconUrl,
              defaultSummaryView,
            } = vnode.state;
            for (const space of snapshot) {
              if (space !== '') {
                if (space.slice(space.length - 4) != '.eth') {
                  notifyError('Snapshot name must be in the form of *.eth');
                  return;
                }
              }
            }
            // Update ChainCategories
            try {
              for (const category of Object.keys(vnode.state.selectedTags)) {
                await setChainCategories(
                  vnode.attrs.chain.id,
                  vnode.state.categoryMap[category],
                  vnode.state.selectedTags[category]
                );
              }
            } catch (e) {
              console.log(e);
            }

            try {
              await vnode.attrs.chain.updateChainData({
                name,
                description,
                website,
                discord,
                element,
                telegram,
                github,
                stagesEnabled,
                customStages,
                customDomain,
                snapshot,
                terms,
                iconUrl,
                defaultSummaryView,
              });
              notifySuccess('Chain updated');
            } catch (err) {
              notifyError(err.responseJSON?.error || 'Chain update failed');
            }
          },
        }),
      ]),
    ]);
  },
};

export default ChainMetadataManagementTable;
