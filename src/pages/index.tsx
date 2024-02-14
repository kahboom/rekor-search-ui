import {
	Container
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import {
	Button,
	Masthead,
	MastheadContent,
	MastheadMain,
	Page, Toolbar, ToolbarContent, ToolbarGroup, ToolbarItem
} from "@patternfly/react-core";
import { RekorClientProvider } from "../modules/api/context";
import { Explorer } from "../modules/components/Explorer";
import { Settings } from "../modules/components/Settings";
import { CogIcon, GithubIcon } from "@patternfly/react-icons";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
	const [settingsOpen, setSettingsOpen] = useState(false);

	return (
		<Page header={
			<Masthead>
				<MastheadMain>
					<Link href={"/"} className={"pf-v5-c-masthead_brand"}>
						<Image
							className={"pf-v5-c-brand"}
							src={"/Logo-Red_Hat-Trusted_Artifact_Signer-A-Reverse-RGB.svg"}
							alt={"Red Hat Trusted Artifact Signer logo"}
							priority={true}
							width={198}
							height={42}
						/>
					</Link>
				</MastheadMain>
				<MastheadContent>
					<Toolbar
						ouiaId="masthead-toolbar"
						id={"masthead-toolbar"}
						isFullHeight
						isStatic
					>
						<ToolbarContent id={"masthead-toolbar"}>
							<ToolbarGroup
								variant="icon-button-group"
								align={{ default: "alignRight" }}
								spacer={{ default: "spacerNone", md: "spacerMd" }}
							>
								<ToolbarGroup
									variant="icon-button-group"
									visibility={{ default: "hidden", lg: "visible" }}
								>
									<ToolbarItem>
										<Button
											aria-label="Settings"
											onClick={() => setSettingsOpen(true)}
											variant={"plain"}
											icon={<CogIcon />}
											ouiaId={"setting-button"}
										/>
									</ToolbarItem>
									<ToolbarItem>
										<Button component="a" href="https://github.com/sigstore/rekor-search-ui" icon={<GithubIcon />}
														target="_blank"
														variant={"plain"}
														ouiaId={"github-link"}
														aria-label={"GitHub Link"}
														rel="noopener noreferrer" />
									</ToolbarItem>
								</ToolbarGroup>
							</ToolbarGroup>
						</ToolbarContent>
					</Toolbar>
				</MastheadContent>
			</Masthead>
		}>
			<Head>
				<title>Rekor Search</title>
				<meta
					name="description"
					content="Search the Rekor public transparency log"
				/>
				<link
					rel="icon"
					href="/logo.png"
				/>
			</Head>

			<Settings
				open={settingsOpen}
				onClose={() => setSettingsOpen(false)}
			/>

			<Container
				sx={{
					mt: 4,
					display: "flex",
					flexDirection: "column",
					gap: 3
				}}
			>
				<Explorer />
			</Container>
		</Page>
	);
};

const PageComponent: NextPage = () => (
	<RekorClientProvider>
		<Home />
	</RekorClientProvider>
);
export default PageComponent;
